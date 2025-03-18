import { Prisma } from "@prisma/client";
import { sendEmail } from "../utils/nodemailer/mail.nodemailer";

export const sendLowStockAlert = async (product: Prisma.ProductGetPayload<{ include: { user: true } }>, userId: number) => {
    const adminEmail = process.env.ADMIN_EMAIL;
    const userEmail = product.user.email;
  
    const subject = `⚠️ Low Stock Alert: ${product.name}`;
    const message = `
      Dear User,
  
      The product "${product.name}" is running low on stock.
      Available Quantity: ${product.quantity}
      Low Stock Threshold: ${product.low_stock_threshold}
  
      Please take necessary action.
  
      Regards,
      Inventory Management Team
    `;
  
    await sendEmail(userEmail, subject, message);
    if(adminEmail){
      await sendEmail(adminEmail, subject, message);
    }
  };