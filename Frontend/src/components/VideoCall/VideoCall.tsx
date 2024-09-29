import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext, useEffect } from "react";
import { endConsult, startConsult } from "../../api/auth";
import { UserContext } from "../../context/UserContext";

function randomID(len: number) {
  let result = "";
  if (result) return result;
  const chars =
    "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
  const maxPos = chars.length
  let i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

// eslint-disable-next-line react-refresh/only-export-components
export function getUrlParams(url = window.location.href) {
  console.log(url);
  const urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

export default function VideoCall() {
  const { userState } = useContext(UserContext);
  const { user } = userState;
  const { id_agendamiento } = useParams();
  const roomID = getUrlParams().get("roomID") || randomID(5);
  const url_videollamada = window.location.pathname + "?roomID=" + roomID;

  useEffect(() => {
    const createRoom = async () => {
      const response = await startConsult(
        Number(id_agendamiento),
        url_videollamada
      );
      return response;
    };
    if (user?.rol === "medico" && !window.location.href.split("?")[1]) {
      createRoom().then((res) => {
        if (!res.error) {
          toast.success("La sala se ha creado exitosamente", {
            position: "bottom-right",
          });
        }
        console.log(res);
      });
    }
  }, [id_agendamiento, url_videollamada, user]);

  const navigate = useNavigate();

  const myMeeting = async (element: never) => {
    // generate Kit Token
    const appID = 1792283924;
    const serverSecret = "bae2b985ab25570968161eb502165f7a";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      randomID(5)
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
      onLeaveRoom: async () => {
        if (user?.rol === "medico") {
          try {
            const response = await endConsult(Number(id_agendamiento));
            if (!response.error) {
              toast.success("Consulta finalizada exitosamente", {
                position: "bottom-right",
              });
              navigate(`/informe-medico/${id_agendamiento}`);
            }
          } catch (error) {
            if (error) {
              toast.error(
                "Ha ocurrido un error al momento de finalizar la consulta",
                { position: "bottom-right" }
              );
            }
          }
        } else {
          navigate(`/paciente/mis-citas`);
        }
      },
    });
  };

  console.log({
    url:
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?roomID=" +
      roomID,
  });

  return (
    <>
      <div
        className="myCallContainer"
        ref={myMeeting}
        style={{ width: "98vw", height: "98vh" }}
      ></div>
    </>
  );
}
