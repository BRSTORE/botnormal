
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

if (!message.member.permissions.has("ADMINISTRATOR")) return;
message.delete();

const IScream = "./iscream.png"

const embed1 = new Discord.MessageEmbed()
        .setTitle("<a:tibia:702157092622172203> | Sobre as punições.")
        .setColor("#bd2f2f")
        .setDescription("O servidor adotará um sistema de punições em 3 níveis de infração. A cada nova punição que você receber, você avançará para o próximo nível. Sendo aceito no máximo 3 punições, se passar disso você poderá ser banido.")
        .setThumbnail("https://imgur.com/8MAtiMe.png")
        await message.channel.send(embed1);

        const embed2 = new Discord.MessageEmbed()
        .setColor("#dbc713")
        .setTitle("Infração Nível 1.")
        .setDescription("<:Esqueleto:702157093771149312> | Serão punições primárias relativas à conduta de um usuário, será um tipo de punição mais leve. A punição poderá ser substituída por um aviso em mensagem ao infrator para que não cometa novamente o erro, pois é compreensível que todos de vez em quando podem vir a cometer um deslize e acabar sendo punidos. O infrator ganhará o cargo <@&612383769499795520> para estar ciente do seu erro e não vir a cometê-lo novamente.")
        .addField("Tempo de Punição:", "<:Dragon:702157093439930469> Até 24 horas.")
        await message.channel.send(embed2);

        const embed3 = new Discord.MessageEmbed()
        .setColor("#e28d2f")
        .setTitle("Infração Nível 2.")
        .setDescription("<:Esqueleto:702157093771149312> | O usuário que ficar infringindo as regras do servidor cairá nesse nível de infração, receberá o cargo <@&612383842258518037> e poderá ficar mutado por até 2 dias, então tomem bastante cuidado para não serem reincidentes.")
        .addField("Tempo de Punição:", "<:Dragon:702157093439930469> Até 48 horas.")
        await message.channel.send(embed3);

        const embed4 = new Discord.MessageEmbed()
        .setColor("#d80202")
        .setTitle("Infração Nível 3.")
        .setDescription("<:Esqueleto:702157093771149312> | Então você é um menino levado? Temos uma surpresinha para você, este é o último nível de infração, o usuário que chegar a esse ponto estará no alerta máximo, receberá o cargo de <@&707390252892815411> e depois disso poderá ser banido do servidor caso seja reincidente.")
        .addField("Tempo de Punição:", "<:Dragon:702157093439930469> Até 72 horas.")
        await message.channel.send(embed4);


        const embed5 = new Discord.MessageEmbed()
        .setColor("#dbc713")
        .addField("⠀", "**(1) ➥** Dado o conhecimento da infração, os moderadores poderão punir a qualquer momento um usuário, mesmo que já se tenha passado horas ou dias do acontecimento do fato. Além disso, nenhum usuário poderá se escusar de ser punido, seja um membro comum, seja um membro da Staff do servidor.")
        .addField("⠀", "**(2) ➥** Usuários que estiverem em desacordo com os **Termos de Serviços** da plataforma também serão punidos, mesmo que seja algo que não esteja posto nas regras do nosso servidor, vocês devem obedecer tanto as normas da plataforma, quanto as regras do servidor.")
        await message.channel.send(embed5);

        const embed6 = new Discord.MessageEmbed()
        .setColor("#e28d2f")
        .addField("⠀", "**(3) ➥** Se recebeu uma punição, não saia do servidor até que cumpra sua pena. Caso saia do servidor durante uma punição nós poderemos aplicar novamente a pena restante a ser cumprida ou ainda acrescentar uma nova punição por ter tentado fugir da primeira.")
        .addField("⠀", "**(4) ➥** É importante deixar os chats do servidor limpos de flood, spam, comentário ofensivo/tóxico e afins. Ademais, lembre-se de respeitar as regras e temática de cada canal, ou seja, spoiler apenas no canal de spoilers; conteúdos considerados shitpost devem ser mandados no chat de shitpost; comandos de bot's apenas nos canais dedicados etc.")
        .addField("⠀", `**(5) ➥** Não marcar qualquer pessoa exageradamente, nem usar a marcação geral (Everyone ou Here) por qualquer motivo que não seja de interesse de todos. Isso também vale para quaisquer outros cargos destacáveis. Além disso, mantenham os assuntos internos do servidor dentro do mesmo, evitem ficar chamando a staff no privado se for um assunto que pode ser resolvido internamente, vocês podem deixar suas sugestões em <#612477827773759518> ou pedir suporte sobre algo em <#689917829998575785> sem sentirem vergonha. Caso for um assunto privado, iremos liberar o acesso a uma sala privada para discussão de assuntos como denúncias e afins.`)
        .addField("⠀", "**(6) ➥** Não divulgue de forma alguma outros servidores Discord, tanto dentro do servidor, quanto no privado de nossos membros. Caso queira você pode divulgar suas mídias e redes sociais, mas atente-se para que seja no chat correto de divulgação.")
        await message.channel.send(embed6);

        const embed7 = new Discord.MessageEmbed()
        .setColor("#d80202")
        .addField("⠀", "**(7) ➥** Não se aproveite de ações não bem especificadas nas regras com o intuito de obter vantagens no servidor. Se algo não ficou claro então chame algum membro com cargo administrativo e peça ajuda para interpretar alguma norma, na dúvida sempre pergunte.")
        .addField("⠀", "**(8) ➥** Quando entrar no servidor tenha bom senso, deve-se ter em mente que ao conhecer algum novo membro algumas pessoas levam as coisas mais na brincadeira enquanto outras são mais sérias[.](https://imgur.com/BjAbtkn.png) Durante as conversas, saiba respeitar diferentes opiniões e pessoas. Brincadeiras idiotas, desrespeito, palavrões, xingamentos e afins não serão tolerados caso o acusado não tenha intimidade com a pessoa passiva de tais atos, primeiro crie amizade e depois estará livre para zoar desde que a pessoa permita.")
        .addField("⠀", "**(9) ➥** Não utilize nicknames, apelidos ou avatar com conotação sexual ou conteúdo sexual explícito. Os moderadores poderão solicitar que mude aquilo que esteja em desacordo com as normas do servidor. Caso se recuse ou demore para responder a solicitação, você poderá ser expulso.")
        .addField("⠀", "**(10) ➥** Respeite a privacidade dos outros membros do servidor, não compartilhe dados pessoais da pessoa se ela não se sente confortável com tal situação. Isso inclui nomes, fotos, redes sociais, localização, número de telefone, entre outros.")
        .addField("⠀", "**(11) ➥** Não assediar usuários sexualmente ou abusar verbalmente desses.")
        await message.channel.send(embed7);

        const embed8 = new Discord.MessageEmbed()
        .setColor("#d80202")
        .setTitle("<a:tibia:702157092622172203> | Regras de Banimento Imediato!")
        .addField("⠀", "**(12) ➥** É estritamente proibido o envio de conteúdo IRL (mídias da vida real) que seja de pedofilia, violência, gore ou quaisquer outros conteúdos que possam ser considerados como criminosos, tanto no servidor, quanto no privado de membros.")
        .addField("⠀", "**(13) ➥** Não fique entrando e saindo do servidor diversas vezes. Não há motivo para fazer isso.")
        .addField("⠀", "**(14) ➥** Entrar no servidor com o intuito de fazer baderna ou ocasionar intriga com outros usuários é passivo de banimento. Isso vale também para usuários que desejam fazer raid no servidor Ice Cream Kingdom, juntamente com aqueles que fazem ou fizeram em outros servidores.")
        .addField("⠀", "**(15) ➥** Assédio pesado é passivo de banimento imediato.")
        .addField("⠀", "**(16) ➥** Caso o intuito da sua entrada no servidor seja mera divulgação de servidores Discord ou qualquer outro tipo de informação para benefício próprio, isso acarretará em banimento imediato. Isso vale tanto para o privado quanto para os chats do server Ice Cream Kingdom.")
        await message.channel.send(embed8);
};

