function loadLastLocation(){
  let persistedTermatemnt = localStorage.getItem('msg_testament');
  let persistedBook = localStorage.getItem("msg_book");
  let persistedChapter = localStorage.getItem("msg_chapter");
  if(persistedTermatemnt == null||persistedBook == null||persistedChapter == null){return;}
  console.log("load location: "+persistedTermatemnt+"."+persistedBook+"."+persistedChapter);
  setLocation(persistedTermatemnt, persistedBook, persistedChapter);
}

function setLocation(testament, book, chapter){
  selectTestament(testament);
  selectBook(book);
  setChapter(chapter);
}

function persistTestament(testament){
  localStorage.setItem("msg_testament", testament);
}

function persistBook(book){
  localStorage.setItem("msg_book", book);
}

function persistChapter(chapter){
  localStorage.setItem("msg_chapter", chapter);
}
