export default function authHeader(): { Authorization: string } | {} {
  const user = JSON.parse(String(localStorage.getItem("user")));
  if (user && user.accessToken) {
    return {
      "Content-type": "application/json",
      Authorization: user.accessToken,
    };
  } else {
    return {};
  }
}
