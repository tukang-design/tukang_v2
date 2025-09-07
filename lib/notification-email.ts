export function getNotificationEmail(): string {
  const email = process.env.BOOKING_NOTIFICATION_EMAIL;
  if (!email) {
    console.warn(
      "BOOKING_NOTIFICATION_EMAIL is not set. Using studio@tukang.design."
    );
    return "studio@tukang.design";
  }
  return email;
}
