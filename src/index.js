const { read } = require('./xml');
const divinglog = require('./divelog');
const macdive = require('./macdive');

const importers = {
  divinglog,
  macdive,
};

export function listImporters() {
  return Object.keys(importer);
}

function importer(file) {
  return read(file).then(xml => {
    let logbook;
    if (importers.divinglog.canImport(xml)) {
      logbook = importers.divinglog.importer(xml);
    } else {
      logbook = importers.macdive.importer(xml);
    }

    return logbook;
  });
}

module.exports = importer 