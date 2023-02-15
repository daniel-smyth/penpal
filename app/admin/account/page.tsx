import React from "react";
import Image from "next/image";
import { getUser } from "@lib/auth";
import { ArticleList } from "@components/app/admin/account";

export default async function AccountPage() {
  const user = await getUser();

  if (!user) {
    return <main>Not logged in</main>;
  }

  console.log(user);

  // <div className="fixed bottom-0 left-0 h-full w-full">
  return (
    <>
      <section className="bg-blueGray-50 h-full w-full pt-16">
        <div className="mx-auto w-full px-4">
          <div className="relative mb-6 mt-16 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-xl">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="flex w-full justify-center px-4">
                  <div className="">
                    <Image
                      className="h-auto rounded-full border-none align-middle shadow-xl lg:-ml-16"
                      alt={user.email || ""}
                      src={
                        user.image ||
                        `https://avatars.dicebear.com/api/micah/${email}.svg`
                      }
                      width={130}
                      height={130}
                    />
                  </div>
                </div>
                <div className="mt-20 w-full px-4 text-center">
                  <div className="flex justify-center py-4 pt-8 lg:pt-4">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-blueGray-600 block text-xl font-bold uppercase tracking-wide">
                        22
                      </span>
                      <span className="text-blueGray-400 text-sm">Friends</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-blueGray-600 block text-xl font-bold uppercase tracking-wide">
                        10
                      </span>
                      <span className="text-blueGray-400 text-sm">Photos</span>
                    </div>
                    <div className="p-3 text-center lg:mr-4">
                      <span className="text-blueGray-600 block text-xl font-bold uppercase tracking-wide">
                        89
                      </span>
                      <span className="text-blueGray-400 text-sm">
                        Comments
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 text-center">
                <h3 className="text-blueGray-700 mb-2 text-xl font-semibold leading-normal">
                  {user.name}
                </h3>
                <div className="text-blueGray-400 mt-0 mb-2 text-sm font-bold uppercase leading-normal">
                  <i className="fas fa-map-marker-alt text-blueGray-400 mr-2 text-lg"></i>
                  {user.email}
                </div>
                <div className="text-blueGray-600 mb-2 mt-10">
                  <i className="fas fa-briefcase text-blueGray-400 mr-2 text-lg"></i>
                  Penpal Developer
                </div>
              </div>
              <div className="border-blueGray-200 mt-10 border-t py-10 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full px-4 lg:w-9/12">
                    <p className="text-blueGray-700 mb-4 text-lg leading-relaxed">
                      An artist of considerable range, Jenna the name taken by
                      Melbourne-raised, Brooklyn-based Nick Murphy writes,
                      performs and records all of his own music, giving it a
                      warm, intimate feel with a solid groove structure. An
                      artist of considerable range.
                    </p>
                    <a
                      href="javascript:void(0);"
                      className="font-normal text-pink-500"
                    >
                      Show more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="relative  mt-8 pt-8 pb-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center md:justify-between">
              <div className="mx-auto w-full px-4 text-center md:w-6/12">
                <div className="text-blueGray-500 py-1 text-sm font-semibold">
                  Made with{" "}
                  <a
                    href="https://www.creative-tim.com/product/notus-js"
                    className="text-blueGray-500 hover:text-gray-800"
                    target="_blank"
                  >
                    Notus JS
                  </a>{" "}
                  by{" "}
                  <a
                    href="https://www.creative-tim.com"
                    className="text-blueGray-500 hover:text-blueGray-800"
                    target="_blank"
                  >
                    {" "}
                    Creative Tim
                  </a>
                  .
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
}
// {/* <div className="h-4/5 overflow-y-auto pt-16">
//   <ArticleList />
// </div> */}

// </div>
