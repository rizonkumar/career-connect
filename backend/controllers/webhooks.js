import { Webhook } from "svix";
import User from "../models/user.model.js";

// API Controller Funtions to manage Clerk User with database

export const clerkWebHooks = async (req, res) => {
  const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!CLERK_WEBHOOK_SECRET) {
    throw new Error("CLERK_WEBHOOK_SECRET is not defined");
  }

  try {
    const wh = new Webhook(CLERK_WEBHOOK_SECRET);

    // Verifying headers
    await wh.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // Getting data from request body
    const { data, type } = req.body;

    // Switch cases for different events
    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: "",
        };

        await User.create(userData);
        res.json({});
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }

      default:
        break;
    }
  } catch (error) {
    console.log("Error in webhook controller", error.message);
    res.json({
      success: false,
      error: error.message,
      message: "Webhooks Error",
    });
  }
};
