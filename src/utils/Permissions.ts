import { PermissionFlags, Permissions } from 'discord.js';

const perms = {
	CREATE_INSTANT_INVITE: 'Criar convite',
	KICK_MEMBERS: 'Expulsar membros',
	BAN_MEMBERS: 'Banir membros',
	ADMINISTRATOR: 'Administrador',
	MANAGE_CHANNELS: 'Gerenciar canais',
	MANAGE_GUILD: 'Gerenciar servidor',
	ADD_REACTIONS: 'Adicionar reações',
	VIEW_AUDIT_LOG: 'Ver registro de auditoria',
	PRIORITY_SPEAKER: 'Voz prioritária',
	STREAM: 'Vídeo',
	VIEW_CHANNEL: 'Ver canais',
	SEND_MESSAGES: 'Enviar mensagens',
	SEND_TTS_MESSAGES: 'Enviar mensagens em Texto-para-voz',
	MANAGE_MESSAGES: 'Gerenciar mensagens',
	EMBED_LINKS: 'Inserir links',
	ATTACH_FILES: 'Anexar arquivos',
	READ_MESSAGE_HISTORY: 'Ver histórico de mensagens',
	MENTION_EVERYONE: 'Mencionar @everyone, @here e todos os cargos',
	USE_EXTERNAL_EMOJIS: 'Usar emojis externos',
	VIEW_GUILD_INSIGHTS: 'Ver estatísticas do servidor',
	CONNECT: 'Conectar',
	SPEAK: 'Falar',
	MUTE_MEMBERS: 'Silenciar membros',
	DEAFEN_MEMBERS: 'Ensurdecer membros',
	MOVE_MEMBERS: 'Mover membros',
	USE_VAD: 'Usar detecção de voz',
	CHANGE_NICKNAME: 'Mudar apelido',
	MANAGE_NICKNAMES: 'Gerenciar apelidos',
	MANAGE_ROLES: 'Gerenciar cargos',
	MANAGE_WEBHOOKS: 'Gerenciar webhooks',
	MANAGE_EMOJIS_AND_STICKERS: 'Gerenciar emojis e figurinhas',
	USE_APPLICATION_COMMANDS: 'Usar comandos de aplicação',
	MANAGE_THREADS: 'Gerenciar tópicos',
	USE_PUBLIC_THREADS: 'Usar tópicos públicos',
	CREATE_PUBLIC_THREADS: 'Criar tópicos públicos',
	USE_PRIVATE_THREADS: 'Usar tópicos privados',
	CREATE_PRIVATE_THREADS: 'Criar tópicos privados',
	USE_EXTERNAL_STICKERS: 'Usar figurinhas externas',
	SEND_MESSAGES_IN_THREADS: 'Enviar mensagens em tópicos',
	START_EMBEDDED_ACTIVITIES: 'Começar atividades',
}

function getPerm(perm: string): Promise<Array<string | PermissionFlags>> {
	return perms[perm];
}

export { getPerm, perms };
