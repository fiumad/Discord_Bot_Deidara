const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const { prefix, token, quotes, voice_channel } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

//sends a random quote from the quotes array at 10 % chance
function randomchance(channel){
    var chance = Math.floor(Math.random() * 10);
    var selection = Math.floor(Math.random() * 17);
    //console.log(chance);
    if (chance === 5){
        channel.send(quotes[selection]);
    }

}

client.on('message', message => {
    if (message.content === 'KATSU'){
        const vc = client.channels.cache.find(channel => channel.id === voice_channel);
        vc.join().then(connection => {
            const stream = ytdl('https://www.youtube.com/watch?v=Lh56yS92wtM', { filter: 'audioonly' }); //https://www.youtube.com/watch?v=MdO3_r6juRU
            const dispatcher = connection.play(stream);
            
            dispatcher.on('finish', () => vc.leave());
        })
        setTimeout(() => {message.channel.send('https://tenor.com/view/saussi%C3%A7on-explode-boom-gif-16089684'); }, 3500);
        
    }
    else if (message.content === `${prefix}info`){
        message.channel.send(`Channel name: ${message.channel}\nauthor: ${message.author}`)
    }
    if (!message.author.bot){
        setTimeout(() => { randomchance(message.channel); }, 1000);
        //console.log('called random chance.\n');
    }
});







client.login(token);
