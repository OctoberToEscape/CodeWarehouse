const BASEUTL = "http://api.chuangwai.xyz";
const authorization =
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7InVzZXJfaWQiOiIwZjE3ZWU1NS0xNzU4LTBkNzgtNDk0NC01ZjIzZDliMGJmZTciLCJtb2JpbGUiOjE1NTAyMjc3MDk2fSwiZXhwIjoxNTk3NDYwNDAwLCJpYXQiOjE1OTcwNDg0ODZ9.rnPdhHlNICr-1mt36lJSVKFexAqy_0LNtyODlmUdOxk";

const getNav = () => {
    return $.ajax({
        url: BASEUTL + "/chinese/products",
        type: "get",
        contentType: "application/json",
        success: (res) => {
            return res.data;
        },
        header: {
            authorization: authorization,
            character: "parents",
        },
    });
};
