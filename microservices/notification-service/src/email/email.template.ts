export const mailTemplate = (
  firstName: string,
  vin: string,
  carModel: string,
  make: string,
): {
  body: {
    name: string;
    greeting: string;
    signature: string;
    intro: string;
    outro: string;
  };
} => ({
  body: {
    name: firstName,
    greeting: 'Hi',
    signature: 'Regards',
    intro: `Your purchase of ${make} ${carModel} was completed successfully. The vin of your new vehicle is ${vin}`,
    outro:
      'This is a no-reply email. Do not reply to this email as we cannot respond to queries sent to this email address. For assistance please email us directly',
  },
});
