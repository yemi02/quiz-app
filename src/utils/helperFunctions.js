import axios from "axios";

export const fetchFromOTDB = async (
  amount = 10,
  category = "",
  difficulty = "",
  type = "multiple"
) => {
  try {
    const options = {
      headers: {
        accept: "application/json",
      },
    };

    const response = await axios.get(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`,
      options
    );
    console.log("respons", response.data);
    return response.data;
  } catch (error) {
    console.log("Error in fetchFromOTDB " + error.message);
    return [];
  }
};

export const decodeHTML = (encodedString) => {
  const span = document.createElement("span");
  span.innerHTML = encodedString;
  return span.innerText;
};
