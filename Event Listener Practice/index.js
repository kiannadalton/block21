const button = document.querySelector("#spanBtn");
const para = document.querySelector("#root");

button.addEventListener("click", () => {
  console.log("This is the span event listener!");
});

// works even with the above button event listener commented out.
para.addEventListener("click", () => {
  console.log(
    "This is the para event listener. This shows that clicking on the span button bubbles up to the <p> tag. As a result, we can use a trigger on a child element and attach the event listener to the parent."
  );
});
