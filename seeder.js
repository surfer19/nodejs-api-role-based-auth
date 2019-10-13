const path = require('path');
const { Seeder } = require('mongo-seeding');
const fetch = require('node-fetch');
const fs =require('fs');

const config = {
  database: {
    name: 'assessment',
  },
  dropDatabase: true,
};

const seeder = new Seeder(config);

const saveUserDataToFileSystem = async () => {
    const allUsers = await fetch('http://www.mocky.io/v2/5808862710000087232b75ac');
    const userContent = (await allUsers.json()).clients
    const userContentPasswords = userContent.map(user => ({...user, password: 'elephant'}))
    const jsonContent = JSON.stringify(userContentPasswords);
    
    fs.writeFile("data/users/users.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
     
        console.log("JSON file has been saved.");
    });
    return jsonContent
}

(async function() {    
    await saveUserDataToFileSystem();    
})();

const collections = seeder.readCollectionsFromPath(
    path.resolve('./data'),{
        transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
    }
);

seeder
    .import(collections)
    .then(async() => {        
        console.log('Success seed!');
    })
    .catch(err => {
        console.log('Error', err);
    });




  


