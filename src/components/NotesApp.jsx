import React from "react";
import NotesList from "./NotesList";
import NotesAdd from "./NotesAdd";
import NotesSearch from "./NotesSearch";
import reactIcon from "../assets/react.png";

import { getAllNotes } from "../utils/local-data";
import Navbar from "./Navbar";
import Footer from "./Footer";

export class NotesApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getAllNotes(),
      search: "",
      archivedNotes: [],
    };

    this.onAddNotesHandler = this.onAddNotesHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
  }

  onAddNotesHandler({ title, body, archived }) {
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: `${+new Date()}`,
            title: title,
            body: body,
            createdAt: new Date().toISOString(),
            archived: archived,
          },
        ],
      };
    });
  }

  onDeleteHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);

    this.setState({ notes });
  }

  onSearchHandler(e) {
    this.setState({
      search: e,
    });
  }

  onArchiveHandler(id) {
    this.setState((prevNote) => ({
      notes: prevNote.notes.map((note) => {
        if (note.id == id) {
          return { ...note, archived: !note.archived };
        }
        return note;
      }),
    }));
  }

  render() {
    const filterSearch = this.state.notes.filter((note) =>
      note.title.toLowerCase().includes(this.state.search.toLowerCase())
    );

    return (
      <>
        <Navbar />
        <main className="relative font-sans py-28 bg-primary">
          <div className="absolute top-5 right-3 md:right-10 ">
            <img
              src={reactIcon}
              alt="react icon"
              width={200}
              className="w-20 md:w-32"
            />
          </div>
          <div className="absolute bottom-5 left-3 md:left-10 ">
            <img
              src={reactIcon}
              alt="react icon"
              width={200}
              className="w-20 md:w-32"
            />
          </div>
          <section className="min-h-screen px-8 md:p-5 m-auto border-dashed rounded-md border-3 w-[60%]">
            <NotesAdd addNotes={this.onAddNotesHandler} />
            <NotesSearch onSearch={this.onSearchHandler} />
            <NotesList
              notes={filterSearch}
              onDelete={this.onDeleteHandler}
              onArchive={this.onArchiveHandler}
            />
          </section>
        </main>
        <Footer />
      </>
    );
  }
}

export default NotesApp;
