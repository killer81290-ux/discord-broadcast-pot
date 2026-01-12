const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const PREFIX = "!bc"; // أمر البرودكاست

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const msg = message.content.slice(PREFIX.length).trim();
  if (!msg) return message.reply("❌ اكتب رسالة البرودكاست");

  const members = await message.guild.members.fetch();
  let sent = 0;

  members.forEach(member => {
    if (!member.user.bot) {
      member.send(msg).then(() => sent++).catch(() => {});
    }
  });

  message.reply(`📣 تم إرسال البرودكاست لـ ${sent} عضو`);
});

client.login(process.env.TOKEN);
