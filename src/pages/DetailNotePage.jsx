import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNote } from "../utils/network-data";
import { showFormattedDate } from "../utils/index";
import LocaleContext from "../contexts/LocaleContext";
import ThemeContext from "../contexts/ThemeContext";

const DetailNotePages = () => {
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      const { error, data } = await getNote(id);

      if (!error) {
        setNote(data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Data sedang dimuat...</p>
      </div>
    );
  }

  return (
    <main
      className={`flex flex-col items-center justify-center min-h-screen px-4 mx-auto font-sans ${
        theme === "light" ? "bg-lightMode" : "bg-darkMode"
      }`}
    >
      <div
        className={`border-dashed  rounded-md  border-3 w-[70%] flex py-3 md:py-10 ${
          theme === "light" ? "border-darkMode" : " border-lightMode"
        } flex-col items-center justify-center `}
      >
        <header className="text-center">
          <h1
            className={`mb-4 text-3xl font-semibold ${
              theme === "light" ? "text-darkMode" : " text-lightMode"
            }`}
          >
            {locale === "id" ? "Detail Catatan" : "Detail Note"}
          </h1>
        </header>
        <section
          className={`w-2/3 ${
            theme === "light"
              ? "text-lightMode  bg-darkMode"
              : "text-darkMode bg-lightMode"
          } rounded-e-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]  p-7`}
        >
          {note ? (
            <div>
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <p className="text-gray-400">
                {showFormattedDate(note.createdAt)}
              </p>
              <p className="mt-4">{note.body}</p>
            </div>
          ) : (
            <p className="text-xl">
              {locale === "id" ? "Catatan Tidak Ditemukan" : "Note Not Found"}
            </p>
          )}
        </section>
      </div>
    </main>
  );
};

export default DetailNotePages;
