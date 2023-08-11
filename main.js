const fs = require("fs");

const KodersBD = "bdKoders.json";

const createDbKoders= (koder) => {
    fs.writeFileSync(koder, "[]", "utf-8");
};
const container = fs.readFileSync(KodersBD, "utf-8");
const contentJson = JSON.parse(container);
!fs.existsSync(KodersBD)? createDbKoders= (koder): null



const createKoder = (koder) => {
    contentJson.push({name: koder});
    fs.writeFileSync(KodersBD, JSON.stringify(contentJson), "utf-8");
}

const listAllKoders = () => {
    contentJson.forEach(koder => {
        console.log(koder);
    });
}

const deleteKoder = (koderName) => {
    if(!contentJson.find(koder => koder.name === koderName)) {
        console.log(`No se pudo borrar${koderName}, debido a que no existe el koder`);
        process.exit(1);
    }else{
        console.log("Borrado con exito")
    }
    fs.writeFileSync(KodersBD, JSON.stringify(deleteKoder), "utf-8");
}

const command = process.argv[2];
const value = process.argv[3];

switch (command) {
    case "add":
        !value && console.log("Agrega el nombre del koder") && process.exit(1);
        createKoder(value);
        break;
    case "ls":
        listAllKoders();
        break;
    case "rm":
        !value && console.log("Agrega el nombre del koder") && process.exit(1);
        deleteKoder(value);
        break;
    case "reset":
        createDbKoders (koder);
        break;
    default:
        console.log("Tu opcion no es valido");
        process.exit(1);
}
