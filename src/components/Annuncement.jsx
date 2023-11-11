import React, { useEffect, useState } from "react";

const AnnouncementBar = () => {
  const [announcement, setAnnouncement] = useState("");
  const announcements = [
    "Get 10% discount. Use: WELCOME10",
    "Free shipping all over the world",
    "Standerd shipping time 3-14 working days",
    "We are strictly maintain our privecy & policies",
  ];
  const animationDuration = 3000;

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * announcements.length);
      setAnnouncement(announcements[randomIndex]);
    }, animationDuration);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const textStyle = {
    opacity: 0,
    animation: `fade-in-out ${animationDuration}ms infinite`,
  };

  return (
    <div className="announcement-bar">
      <p className="text-white" style={textStyle}>
        {announcement}
      </p>
    </div>
  );
};

export default AnnouncementBar;
