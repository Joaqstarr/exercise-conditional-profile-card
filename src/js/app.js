import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should show the cover image
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "right", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastName: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console
  // here we ask the logical questions to make decisions on how to build the html
  // if includeCover==false then we reset the cover code without the <img> tag to make the cover transparent.
  let cover = variables.background;

  let name =
    EmptyIfNull(variables.name) + " " + EmptyIfNull(variables.lastName);
  let role = EmptyIfNull(variables.role);
  let city = EmptyIfNull(variables.city);
  let country = EmptyIfNull(variables.country);

  let socialMediaPos = "right-0 translate-x-full rounded-r";
  console.log(variables.socialMediaPosition);
  if (variables.socialMediaPosition != "position-right")
    socialMediaPos = "left-0 -translate-x-full rounded-l";

  if (variables.includeCover == false) cover = "";

  // reset the website body with the new html output
  document.querySelector(
    "#widget_content"
  ).innerHTML = `<div class="m-11 h-72 w-64 flex-col rounded shadow-2xl bg-white relative ">
    <div class="h-2/4 relative rounded-t" style="background-image: url(${cover}); background-size: 100% auto;">
      <div class=" absolute bottom-0 ${socialMediaPos} flex-col-reverse w-6 justify-items-center overflow-hidden">
        <a href="${variables.twitter}">
          <div class="bg-blue-300 w-6 h-6 shadow-inner hover:shadow-lg">
            <i class="fa-brands fa-twitter translate-x-1 text-white hover:shadow-lg"></i>
          </div>
        </a>
        <a href="${variables.github}">
          <div class="bg-blue-300 w-6 h-6 shadow-inner hover:shadow-lg">
            <i class="fa-brands fa-github translate-x-1 text-white hover:shadow-lg"></i>
          </div>
        </a>
        <a href="${variables.linkedin}">
          <div class="bg-blue-300 w-6 h-6 shadow-inner hover:shadow-lg">
            <i class="fa-brands fa-linkedin translate-x-1 text-white hover:shadow-lg"></i>
          </div>
        </a>
        <a href="${variables.instagram}">
          <div class="bg-blue-300 w-6 h-6 shadow-inner hover:shadow-lg">
            <i class="fa-brands fa-instagram translate-x-1 text-white hover:shadow-lg"></i>
          </div>
        </a>
      </div>
    </div>
    <div class="w-20 h-20 rounded-full absolute translate-x-1/2 right-2/4 -translate-y-3/4 border-white border-4" style="background-image: url(${variables.avatarURL}); background-size: auto 100%;"></div>
    <div class="flex-col items-center justify-center align-middle p-7 ">
      <h1 class="text-center text-xl">${name}</h1>
      <h2 class="text-gray-400 text-center">${role}<h2>
      <h2 class="text-gray-400 text-center text-xs">${city}, ${country}</h2>
    </div>
  </div>
    `;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};

function EmptyIfNull(text) {
  if (text == null) return "";
  return text;
}
