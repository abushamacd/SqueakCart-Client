import React from "react";
import { Link } from "react-router-dom";
import main_logo from "../assets/main_logo.png";

const NotFound = () => {
  return (
    <div>
      <div class="flex items-center justify-center">
        <div class="px-4 lg:py-12">
          <div class="flex  items-center justify-center md:py-24 lg:py-32">
            <div>
              <h1 class="font-bold text-blue-600 text-9xl">404</h1>
              <p class="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                <span class="text-red-500">Oops!</span> Page not found
              </p>
              <p class="mb-8 text-center text-gray-500 md:text-lg">
                The page you’re looking for doesn’t exist.
              </p>
              <Link
                to="/"
                class="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"
              >
                Go home
              </Link>
            </div>
            <div class="mt-4">
              <img src={main_logo} alt="img" class="w-[500px] h-[200]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
