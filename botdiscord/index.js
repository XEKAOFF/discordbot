// Importation des modules

    const Discord = require('discord.js');
    const FiveM = require("fivem");
    const figlet = require('figlet');
    const colors = require('colors');


// Configuration du client

    const client = new Discord.Client();
    // Importation de du config.json
    const config = require('./config.json'); 


// Mise à jour du statut avec les joueurs toutes les X secondes


    // Array contenant le ou les serveurs
    const serveur = {
        heresy: new FiveM.Server('51.38.60.126:30120'),
        dev: new FiveM.Server('51.38.235.33:30120')
    }

    // Array pour def les var pr pas derreur 
    let stats = {
        joueurs: null,
        maxJoueurs: null,
        statut: null,
    };    

    // Exec toutes les X secondes
    setInterval(
        async function UpdateStatut(){

            // On recupères les infos
            stats.joueurs = await serveur.heresy.getPlayers();
            stats.maxJoueurs = await serveur.heresy.getMaxPlayers();
            stats.statut = await serveur.heresy.getServerStatus();

            // On set le statut
            try {
                // Si le serveur est HS
                if(stats.statut == false){
                    await client.user.setActivity(
                        "Serveur hors ligne",
                        { type: 'WATCHING' }
                    );
                // Sinon
                }else{
                    await client.user.setActivity(
                        stats.joueurs.toString() + "/" + stats.maxJoueurs.toString() + " connectés",
                        { type: 'WATCHING' }
                    );
                }
                
            } catch(error){
                console.log(error);
            }
        }
    , 5000); // 5 secondes en MS


// Lancement de l'instance

    figlet('HeresyWATCH', function(err, data) {
        if (err) {
            console.log(colors.red('Quelque chose c\'est mal passé.'));
            console.dir(err);
            return;
        }
        console.log(colors.blue(data));
        console.log('Un bot développé avec <3 par Lukas.');
        console.log(' ');
    });


    client.on('ready', function() {
        console.log(colors.green('> Connexion à discord effectuée avec succès.'));
        console.log(' ');
        console.log(colors.green('> Nom de l\'instance: ' + client.user.username));
    });
    

    client.login(config.token);


// Made with <3 by i'm james#0007