import emailjs from "@emailjs/browser";

export function sendEmail(
  message: string,
  user_name: string,
  user_email: string,
) {
  emailjs
    .send(
      "service_fsazhyk",
      "template_l3czg6h",
      {
        from_name: "Manoj",
        to_name: user_name, // Example data
        to_email: user_email,
        message: message,
      },
      "e68N6JL9ImiDOvv5C",
    )
    .then((result) => {
      console.log("Success: ", result.text);
    })
    .catch((error) => {
      console.error("Error: ", error.text);
    });
}
