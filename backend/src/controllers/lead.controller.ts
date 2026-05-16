import { Request, Response } from 'express';
import Lead from '../models/Lead';
import { Parser } from 'json2csv';

export const createLead = async (
    req: Request,
    res: Response
) => {
    try {
        const lead = await Lead.create(
            req.body
        );

        res.status(201).json({
            success: true,
            data: lead
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

export const getLeads = async (
    req: Request,
    res: Response
) => {
    try {
        const page =
            Number(req.query.page) || 1;

        const limit = 10;

        const skip = (page - 1) * limit;

        const {
            status,
            source,
            search,
            sort
        } = req.query;

        const query: any = {};

        if (status) {
            query.status = status;
        }

        if (source) {
            query.source = source;
        }

        if (search) {
            query.$or = [
                {
                    name: {
                        $regex: search,
                        $options: 'i'
                    }
                },
                {
                    email: {
                        $regex: search,
                        $options: 'i'
                    }
                }
            ];
        }

        const sortOption: Record<
            string,
            1 | -1
        > =
            sort === 'oldest'
                ? { createdAt: 1 }
                : { createdAt: -1 };

        const leads = await Lead.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);

        const total =
            await Lead.countDocuments(query);

        res.json({
            success: true,
            data: leads,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(
                    total / limit
                )
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

export const getLeadById = async (
    req: Request,
    res: Response
) => {
    try {
        const lead = await Lead.findById(
            req.params.id
        );

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: 'Lead not found'
            });
        }

        res.json({
            success: true,
            data: lead
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

export const updateLead = async (
    req: Request,
    res: Response
) => {
    try {
        const lead =
            await Lead.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true
                }
            );

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: 'Lead not found'
            });
        }

        res.json({
            success: true,
            data: lead
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

export const deleteLead = async (
    req: Request,
    res: Response
) => {
    try {
        const lead = await Lead.findById(
            req.params.id
        );

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: 'Lead not found'
            });
        }

        await lead.deleteOne();

        res.json({
            success: true,
            message: 'Lead deleted'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

export const exportLeadsCSV = async (
    req: Request,
    res: Response
) => {
    try {
        const {
            status,
            source,
            search,
            sort
        } = req.query;

        const query: any = {};

        if (status) {
            query.status = status;
        }

        if (source) {
            query.source = source;
        }

        if (search) {
            query.$or = [
                {
                    name: {
                        $regex: search,
                        $options: 'i'
                    }
                },
                {
                    email: {
                        $regex: search,
                        $options: 'i'
                    }
                }
            ];
        }

        const sortOption: Record<string, 1 | -1> =
            sort === 'oldest'
                ? { createdAt: 1 }
                : { createdAt: -1 };

        const leads = await Lead.find(query).sort(sortOption).lean();

        const fields = [
            'name',
            'email',
            'status',
            'source',
            'createdAt'
        ];

        const parser = new Parser({
            fields
        });

        const csv = parser.parse(leads);

        res.header(
            'Content-Type',
            'text/csv'
        );

        res.attachment('leads.csv');

        return res.send(csv);
    } catch (error) {
        console.error('Export CSV Error:', error);
        res.status(500).json({
            success: false,
            message: 'Export failed'
        });
    }
};