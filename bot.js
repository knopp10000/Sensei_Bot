var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
const WEEKDAYS = ['Sunday', 'Monday', 'Thuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
     if(message.substring(0, 21) == '<@490604527796486184>'){
       var args = message.substring(21).split(' ');
       var cmd = args[1];
       logger.info('cmd: ' + cmd + ' args: ' + args)

       //args = args.splice(1);
       switch(cmd.toLowerCase()) {
           // !ping
           case 'ping':
               bot.sendMessage({
                   to: channelID,
                   message: 'Pong!'
               });
           break;
           case 'admin':
               bot.sendMessage({
                   to: channelID,
                   message: '<@!294957314207645696> är admin!'
               });
           break;
           case 'när':
            let date = new Date();
            let day = date.getDay();
               bot.sendMessage({
                   to: channelID,
                   message: 'It is ' + WEEKDAYS[day]
               });
           break;
           case 'visa':
           switch(args[2].toLowerCase()){
             case 'schema':
                   bot.sendMessage({
                       to: channelID,
                       message: 'https://daisy.dsv.su.se/servlet/schema.moment.Momentschema?id=6458'
                     });
             break;
             default:
               bot.sendMessage({
                   to: channelID,
                   message: 'jag vet tyvärr inte vad du menar med: ' + args[2] + ' :(('
                 });
                 break;
           }
           case 'slå':
            switch(args[2].toLowerCase()){
              case 'tärning':
                let dicerole = Math.floor(Math.random()*6);
                    bot.sendMessage({
                        to: channelID,
                        message: user + ' slog en ' + dicerole + '!'
                      });
              break;
              // default:
              //   bot.sendMessage({
              //       to: channelID,
              //       message: 'jag vet tyvärr inte vad du menar med: ' + args[2] + ' :('
              //     });
              //     break;
            }
          // default:
          //   bot.sendMessage({
          //       to: channelID,
          //       message: 'jag vet tyvärr inte vad du menar med: ' + args[1] + ' :('
          //     });
          //     break;
         }

     }
});
