import {getPKFromQuery} from "./utils.js"
import {setName} from "./utils.js"
import {setHref} from "./utils.js"
import {serverURL} from "./utils.js"


document.addEventListener("DOMContentLoaded", function () {
    fetch(`${serverURL}classroom/detail/${getPKFromQuery("classroom")}/`, {
        method: "GET",
        headers: {
        "Authorization": `Bearer ${accessToken}`
    }
    })
    .then(response => response.json())
    .then(data => {
        setName(".classroom-name", data.class_name);
        setHref(".classroom-name", `board.html?classroom=${data.id}`)
    })
    .catch(error => {
    console.error("Error fetching data:", error);
    });

    fetch(`${serverURL}classroom/board/detail/${getPKFromQuery("board")}/`, {
        method: "GET",
        headers: {
        "Authorization": `Bearer ${accessToken}`
    }
    })
    .then(response => response.json())
    .then(data => {
        setName(".board-name", data.title);
        setHref(".board-name", `post-list.html?classroom=${getPKFromQuery("classroom")}&board-type=${data.board_type}&board=${data.id}`);
    })
    .catch(error => {
    console.error("Error fetching data:", error);
    });
});
