function smoothScrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// return video or img depending on filetype
function media(src, className) {
  if (!src) {
    return null;
  }

  if (!className) {
    className = "";
  }
  return src && src.substring(src.length - 4) === ".mp4" ? (
    <video
      src={src}
      autoPlay="autoplay"
      muted
      loop
      className={className + " media"}
    />
  ) : (
    <img src={src} className={className + " media"} />
  );
}

function getTimeAgo(date) {
  const dateObj = new Date(date);
  const seconds = Math.floor(Date.now() / 1000 - dateObj / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const yearType =
    dateObj.getFullYear() === new Date().getFullYear() ? undefined : "numeric";

  let resultStr = "";

  if (hours >= 24) {
    resultStr =
      dateObj.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: yearType,
      }) +
      " at " +
      dateObj.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      });
  } else if (hours >= 1) {
    resultStr = hours + "h";
  } else if (minutes >= 1) {
    resultStr = minutes + "m";
  } else {
    resultStr = "just now";
  }

  return resultStr;
}

function getLongDateTime(date) {
  const dateObj = new Date(date);

  let resultStr = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  resultStr +=
    " at " +
    dateObj.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });

  return resultStr;
}

function getTimeAgoShort(date) {
  const dateObj = new Date(date);
  const seconds = Math.floor(Date.now() / 1000 - dateObj / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(weeks / 4.333);
  const years = Math.floor(months / 12);

  let resultStr = "";

  if (years >= 1) {
    resultStr = years + "y";
  } else if (months >= 1) {
    resultStr = months + "mo";
  } else if (weeks >= 1) {
    resultStr = weeks + "w";
  } else if (days >= 1) {
    resultStr = days + "d";
  } else if (hours >= 1) {
    resultStr = hours + "h";
  } else if (minutes >= 1) {
    resultStr = minutes + "m";
  } else {
    resultStr = "just now";
  }

  return resultStr;
}

function getUsersTooltipContent(users) {
  let string = "";

  let uniqueUsers = [];
  for (const user of users) {
    if (!uniqueUsers.some((unique) => unique._id === user._id)) {
      uniqueUsers.push(user);
    }
  }

  for (let i = 0; i < uniqueUsers.length && i < 9; i++) {
    string += `${uniqueUsers[i].first_name} ${uniqueUsers[i].last_name}\u000D\u000A`;
  }

  if (uniqueUsers.length >= 10) {
    string += `and ${uniqueUsers.length - 9} more...\u000D\u000A`;
  }

  return string;
}

export {
  smoothScrollToTop,
  media,
  getTimeAgo,
  getLongDateTime,
  getTimeAgoShort,
  getUsersTooltipContent,
};
