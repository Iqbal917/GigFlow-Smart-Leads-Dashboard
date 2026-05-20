import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import Lead from "../models/Lead";

dotenv.config();

const statuses = ["New", "Contacted", "Qualified", "Lost"];
const sources = ["Website", "Instagram", "Referral"];

async function seedLeads(count = 10000) {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    console.log("Connected to MongoDB");

    // Optional: clear existing data
    await Lead.deleteMany({});

    const leads = Array.from({ length: count }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      status: faker.helpers.arrayElement(statuses),
      source: faker.helpers.arrayElement(sources),
    }));

    console.time("Insert");

    await Lead.insertMany(leads, {
      ordered: false,
    });

    console.timeEnd("Insert");

    console.log(`✅ Inserted ${count.toLocaleString()} leads`);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedLeads(10000);