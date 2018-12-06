module.exports = function (text, level) {
  let id;
  switch (level) {
    // h1の場合
    case 1:
      id = 'header'
      return `
            <section id="${id}">
            <h1>${text}</h1>
          `;
    // h2の場合
    case 2:
      id = text.replace(/\s/g, '-')
      return `
            </section>
            <section id="${id}">
            <h2>${text}</h2>
          `;
    // h3の場合
    case 3:
      id = text.replace(/\s/g, '-')
      return `
            <h3 id="${id}">${text}</h3>       
          `;
    default:
      return `
            <h${level}>${text}</h${level}>
            `;
  }
};