import React from "react";
import Register from "../Users/Register";

import PublicPosts from "../Posts/PublicPosts";

const Homepage = () => {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50" />
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-green-200/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" />

        <div className="relative py-16 md:py-20">
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap items-start gap-y-10">
              <div className="w-full lg:w-1/2">
                <span className="inline-flex items-center gap-2 py-1 px-3 mb-5 text-xs leading-5 text-green-700 bg-green-100 font-semibold uppercase rounded-full shadow-sm">
                  Blogify
                  <span className="h-1 w-1 rounded-full bg-green-600" />
                  Write. Share. Grow.
                </span>

                <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl leading-tight text-coolGray-900 font-bold tracking-tight">
                  A modern home for your stories
                </h1>

                <p className="mb-8 text-base md:text-lg leading-7 text-coolGray-600 font-medium max-w-xl">
                  Publish posts, follow creators, and build your audience. Blogify
                  keeps it simple: great writing, great reading, and a smooth
                  community experience.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/70 backdrop-blur border border-coolGray-100 shadow-sm">
                    <p className="text-coolGray-900 font-semibold mb-1">Fast onboarding</p>
                    <p className="text-sm text-coolGray-600">
                      Create an account and start posting in minutes.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/70 backdrop-blur border border-coolGray-100 shadow-sm">
                    <p className="text-coolGray-900 font-semibold mb-1">Powerful publishing</p>
                    <p className="text-sm text-coolGray-600">
                      Upload images, schedule posts, and stay consistent.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/70 backdrop-blur border border-coolGray-100 shadow-sm">
                    <p className="text-coolGray-900 font-semibold mb-1">Community-first</p>
                    <p className="text-sm text-coolGray-600">
                      Follow, like, clap, and comment on great content.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/70 backdrop-blur border border-coolGray-100 shadow-sm">
                    <p className="text-coolGray-900 font-semibold mb-1">Discover stories</p>
                    <p className="text-sm text-coolGray-600">
                      Browse trending posts and explore categories.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <Register />
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicPosts />
    </div>
  );
};

export default Homepage;
