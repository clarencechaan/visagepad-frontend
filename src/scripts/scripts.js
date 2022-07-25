function smoothScrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// return video or img depending on filetype
function media(src, className) {
  if (!className) {
    className = "";
  }
  return src && src.substring(src.length - 4) === ".mp4" ? (
    <video
      src={src}
      autoplay="autoplay"
      muted
      loop
      className={className + " media"}
    />
  ) : (
    <img src={src} className={className + " media"} />
  );
}

export { smoothScrollToTop, media };
