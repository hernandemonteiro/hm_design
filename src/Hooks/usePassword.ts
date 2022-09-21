import { useState } from "react";
import useToken from "./useToken";

export default function usePassword() {
  const [email, setEmail] = useState("");
  const [view, setView] = useState<any>("");
  const [message, setMessage] = useState("");
  const [seconds, setSeconds] = useState(4);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hash, setHash] = useState<string | undefined>("");

  function forgotPassword(event: any) {
    event.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/forgotPassword/${email}`, {
      method: "POST",
      headers: {
        "x-access-token": useToken(),
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.result === "Email enviado!") {
          setView("Success");
        } else if (response.result === "Usuário não existe!") {
          setMessage("Usuário não encontrado em nosso sistema!");
        } else {
          console.log(response);
          setMessage("Erro em nosso servidor, tente novamente mais tarde!");
        }
      })
      .catch((error) => {
        setMessage("Erro em nosso servidor, tente novamente mais tarde!");
        console.log(error);
      });
  }

  function updatePassword(event: Event) {
    event.preventDefault();
    fetch(
      `${import.meta.env.VITE_API_URL}/updatePassword/${hash}/${password}`,
      {
        method: "PUT",
        headers: {
          "x-access-token": useToken(),
        },
      }
    )
      .then((response: any) => response.json())
      .then((response: any) => {
        console.log(response);
        if (response.result === "Success") {
          return (window.location.href = "/login");
        } else {
          return setMessage("Erro ao mudar senha!");
        }
      })
      .catch((error: any) => {
        setMessage("Erro ao mudar senha!");
        console.log(error);
      });
  }

  function confirmHash() {
    fetch(`${import.meta.env.VITE_API_URL}/confirmHash/${hash}`, {
      headers: {
        "x-access-token": useToken(),
      },
    })
      .then((response: any) => response.json())
      .then((response: any) => {
        if (response.result === 0) {
          setView(false);
        }
      });
  }

  return {
    view,
    setSeconds,
    seconds,
    forgotPassword,
    message,
    setEmail,
    email,
    confirmHash,
    updatePassword,
    setPassword,
    password,
    setConfirmPassword,
    confirmPassword,
    setHash,
    hash
  };
}
