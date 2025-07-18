  import 
  export const checkForm = () => {
    const specialChars = /[^a-zA-Z0-9 ]/g;
    if (!fullName || !email || !subject || !message) {
      setFormErrors(true);
      setErrorManagement(errorManager.formError);
      setTimeout(() => {
        setFormErrors(false);
      }, 3000);
    } else {
      setFormErrors(false);
      sendEmail();
      setButtonText("Sending");
      //enviar mail
    }
  };