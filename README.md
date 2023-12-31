# QUACK50 DISCORD BOT

#### Video Demo:  https://youtu.be/08jZkbQEmHc

#### Description:

quack50 is a Harvard CS50 inspired discord bot. This bot's purpose is to help you dubug your code, test your coding knowledge, tame wild ducks, and have your ducks quack if off(battle)! If the last bit sounds familiar, no it doesn't!

I wanter to make something I have never done before but will also enjoy coding so I came up with this project! I hope you like it!

Ever since Dr. Malan showed us the duck debugger I thought it was so funny and wholesome.
There was a lecture where he showed a program that takes any string input and the program's sole purpose
in life was to just say "quack". Essentially, the goal was you used that tool to help you debug your code.
Even though, it only replies quack, it helps you think/talk through what was going on with your program.
I started off my discord bot with doing just that then I added a few silly features to it.

## GITHUB LINK

(github)[https://github.com/hannahfragante/quack50_discord_bot]

## Discord Invite Link

Discord bot invite link: [invite](https://discord.com/api/oauth2/authorize?client_id=1173760699068055632&permissions=8&scope=applications.commands%20bot)

- NOTE: if the bot is offline then im not paying the online server anymore sorry you would have to host it yourself :( (insturctions below under "RUNNING LOCALLY")

### How the bot works
After inviting the bot to your account, you can start using its commands to use it!

First things first, the best functionality of this bot! If you're having trouble debugging your code, just talk to quack 50!
- Use command `dd <anything you wanna tell or ask quack50>` without the `<>`

Game Function:
- First, you need to register yourself as a player in the quack50 database to do that type this command as a message on discord: `dd -hacker`

- Now you can use the `dd -info` command to view your profile. Initially, you are given 1 OG Duck, and you build your team from there!

- And, that's pretty much it!...just kidding lol

- You and your friends can just keep messaging as normal BUT after a certain number of messages, quack50 will random pop up a coding question and you can answer with `dd -answer <your answer>`, of you answer correctly, you gain player `xp` that goes towards you PLAYER LEVEL...but more on player mechanics later down this document

- ALSO! however, in addition to a random question that pops up, after a certain number of messages, a "wild duck" appears open for any registered hackers to tame! To tame, you use the command `dd -tame <duck name>` NOTE: Catching duplicates of ducks makes your ducks stronger (kinda like genshin constellations or star rail eidolons, if you play those games)...but more on duck mechanics later down this document

- the last mention worthy feature of this bot is you can challenge other player's ducks in a COMPLETELY RNG battle (it's just for funsies), you do this with the `/quackoff <another hacker>` command

- that's pretty much it for the big things

### Player Mechanics

- Player `xp` do not make your ducks stronger, it's only directly connected to how many questions you've answered and you gain titles after certain levels, those titles are as follows:

```
Level 1: Baby Hacker
Level 10: Junior Hacker
Level 20: Intermediate Hacker
Level 50: Senior Hacker
Level 100+: TERMINATOR
```

- the amount of `xp` your earn is based on the difficulty of the question

### Duck Mechanics

- By, default you get 1 copy of `OG Duck` and it's set to `level 1`

- Taming the same duck will gain you `duplicates` of that duck, making it stronger aka GAIN a level

- for every duplicate of that duck, your duck gains a level until level 7 (why 7? because it's my favorite number)

- the "battle mechanics" is COMPLETELY RANDOM but i've added a fun twist to it, run the `/quackoff <another hacker>` command so you can see!

- but a `quack off` uses your CURRENT ACTIVE DUCK as it's warrior

- to see all your ducks, use command `dd -myducks`

- to change your active duck use command `dd -active <duck number which can be found from -myducks command>`

- Every duck has these stats:
```
hp: health
damage: the amount of damage they have
recoil: dmg taken every time they attack
tank damage: amount of damage they tank every time they get hit
heal: amount they heal for every time they get attacked
```


### ALL BOT COMMANDS

all of these commands are used like this: `dd <command>` where `<command>` are any of these list of commands:

- *SPECIAL DEBUGGER QUACK command*<br> 
quack50's bread and butter ask quack50 debugging questions to help you figure out your coding problems!
command: `dd <anything you wanna ask quack50 to help you debug :)>`

- *ANSWER commands*<br>
The answer commands is for answering randomly popped coding questions by quack50 in the server
NOTE: this command is used as follows: `dd <command> <answer to a question>`<br>
commands: `-a` `-ans` `-answer`

- *INFORMATION commands*<br>
The information commands is for looking at your player info<br>
commands: `-i` `-info`

- *NEW PLAYER commands*<br>
The new player commands is for registering new hackers in quak50's database<br>
commands: `-hacker`

- *PLAYER DUCKS commands*<br>
The player ducks commands is to see all the ducks you have tamed<br>
commands: `-md` `-myducks`

- *DUCKS commands*<br>
The ducks commands is to see all the ducks in the database<br>
commands: `-d` `-ducks`

- *CHANGE ACTIVE DUCK commands*<br>
The change active duck commands is to change hacker's current active duck to use for quackoffs!<br>
NOTE: this command is used as follows: `dd <command> <duck number>` to figure out your duck's number use dd -myducks<br>
commands: `-active`

- *TAME commands*<br>
The tame duck commands is to tame wild ducks!<br>
NOTE: this command is used as follows: `dd <command> <duck name>`<br>
commands: `-tame` `-t`

- *COMMANDS commands*<br>
this commands is used to show all of quack50's commands!<br>
commands: `-commands`

- *quack50 command*<br>
this commands is used to send a link to quack50's documentation!<br>
commands: `-quack50`

- *SLASH COMMANDS*<br>
This command is to initiate a quackoff with someone<br>
`/quackoff <target-user>` where `<target-user>` is another valid player<br>
`/quack` just quack's back :)



### That is pretty much for the bot, if you wanna run this locally and make your own changes or add you rown spins, keep reading!



## RUNNING LOCALLY

### Installations

for this project, you need to have [node.js](https://nodejs.org/en/) installed

NEXT RUN THIS:
```bash
npm install
```

NOTE: I also installed nodemon GLOBALLY so i can serve my bot locally, i suggest you do the same
```bash
npm install -g nodemon
```

### Set Up | .env AND config.json 

For this project to work, we need to set up your `.env` and `config.json` files

for your `.env` file, you will need:
- a `UNIQUE TOKEN` for your discord bot
- your Discord server's `GUILD ID` (whatever testing discord server you want this bot to run in)
- your bot's `UNIQUE ID`
- `MONGODB_URI` or A working MONGO DB database really . I used an online tool called (MongoDB Atlas)[https://www.mongodb.com/cloud/atlas/register] for mine. (how to set up your own MongoDB ATLAS)[https://www.youtube.com/watch?v=edeNqzKvj0g&list=PLpmb-7WxPhe0ZVpH9pxT5MtC4heqej8Es&index=11]

for your `config.json` file, you will need:
```javascript
{
    "testServer": "discord test server ID",
    "clientId" : "your BOT's ID",
    "devs" : ["list of comma separated discord use ID's to be devs of your bot"]
}
``` 

### That's prettymuch it

just run `nodemon` on your terminal while you are on the main directory of the project and it should work!

### Troubleshooting

this (youtube playlist)[https://www.youtube.com/playlist?list=PLpmb-7WxPhe0ZVpH9pxT5MtC4heqej8Es] was my holy grail making this bot so just go through it if you are running into problems

(how to set up your own MongoDB ATLAS)[https://www.youtube.com/watch?v=edeNqzKvj0g&list=PLpmb-7WxPhe0ZVpH9pxT5MtC4heqej8Es&index=11]


