const passord = "sd#sae@gmail.com";
const register = new Promise((resolve, reject) => {
  if (new RegExp(/\w+@\w+\.\w+/, "gy").test(passord)) {
    resolve(passord);
  } else {
    reject({
      Error: new Error("Make sure you type the email correctly"),
      messages: "Make sure you type the email correctly",
    });
  }
});

const controller = async () => {
  try {
    const data = await register;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

controller();
