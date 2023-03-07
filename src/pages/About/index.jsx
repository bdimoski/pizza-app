import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";
import deliciousPizza from "../../assets/pizza-about.jpg";

const About = () => {
  const [isButtonShown, setIsButtonShown] = useState(false);
  function showButton() {
    setIsButtonShown(true);
  }
  const textAnimation = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 500,
  });

  const imageAnimation = useSpring({
    to: { transform: "scale(1)", opacity: 1 },
    from: { transform: "scale(0.5)", opacity: 0 },
    delay: 1000,
  });
  const buttonAnimation = useSpring({
    to: {
      transform: isButtonShown ? "scale(1.05)" : "scale(1)",
      boxShadow: isButtonShown
        ? "0 0 20px rgba(0, 0, 0, 0.5)"
        : "0 0 0 rgba(0, 0, 0, 0)",
    },
  });

  return (
    <div>
      <section className="py-16 bg-white">
        <div className="container mx-auto flex flex-col p-4 md:flex-row justify-around items-center">
          <div className="w-full md:w-2/5 mb-8 md:mb-0">
            <animated.h1
              style={textAnimation}
              className="text-5xl font-bold mb-4 text-teal-300"
            >
              Our Story
            </animated.h1>
            <animated.p style={textAnimation} className="text-gray-600 mb-4">
              It all started with a simple dream: to make the best pizza in
              town. We believe that pizza is more than just a dish, it's an
              experience. That's why we use only the freshest and locally
              sourced ingredients to create delicious, mouth-watering pizzas
              that will leave you wanting more.
            </animated.p>
            <animated.p style={textAnimation} className="text-gray-600 mb-4">
              Our team is dedicated to providing you with the best pizza
              experience you'll ever have. From the moment you step into our
              restaurant, you'll be greeted with a warm smile and a friendly
              atmosphere. Our chefs are passionate about their craft and take
              pride in every pizza they create.
            </animated.p>
            <animated.p style={textAnimation} className="text-gray-600 mb-4">
              We're not just a pizza place, we're a family. We believe that food
              brings people together, and we're proud to be a part of your
              community. Whether you're grabbing a quick slice on your lunch
              break or enjoying a family dinner, we're here to make your
              experience unforgettable.
            </animated.p>
            <animated.p
              style={textAnimation}
              className="text-xl mb-10 text-teal-300 font-bold"
            >
              Come taste the difference for yourself and see why we're the best
              pizza place in town.
            </animated.p>
            {isButtonShown && (
              <Link to="/" id="order-button">
                <animated.b
                  style={buttonAnimation}
                  className="bg-teal-500 text-white py-3 px-6 rounded-lg hover:bg-teal-600 transition-all animate-pulse"
                >
                  Order Now
                </animated.b>
              </Link>
            )}
          </div>
          <div className="w-full md:w-2/5 relative h-[600px]">
            <animated.img
              style={imageAnimation}
              src={deliciousPizza}
              alt="Pizza"
              className="w-full h-full object-cover object-center rounded-lg shadow-lg"
              onLoad={showButton}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-gray-900 via-transparent"></div>
            <div
              id="pizza-text"
              className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center"
            >
              <h2 className="text-3xl font-bold mb-2 text-white animate-pulse">
                Try Our Delicious Pizza!
              </h2>
              <p className="text-lg mb-4 text-white animate-fade-in">
                Made with the freshest ingredients, our pizza is sure to satisfy
                your cravings.
              </p>
              {isButtonShown && (
                <Link to="/" id="order-button">
                  <animated.b
                    style={buttonAnimation}
                    className="bg-teal-500 text-white py-3 px-6 rounded-lg hover:bg-teal-600 transition-all animate-pulse"
                  >
                    Order Now
                  </animated.b>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;