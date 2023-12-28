import { Ctx, InjectBot, On, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { I18nService } from 'nestjs-i18n';
import { TelegrafExceptionFilter } from 'src/common/filters/telegraf-exeption.filter';
import { UseFilters } from '@nestjs/common';

@Update()
@UseFilters(TelegrafExceptionFilter)
class BotUpdate {
  constructor(
    @InjectBot('RU') private readonly botRU: Telegraf<Context>,
    @InjectBot('EN') private readonly botEN: Telegraf<Context>,
    @InjectBot('ES') private readonly botES: Telegraf<Context>,
    @InjectBot('PT') private readonly botPT: Telegraf<Context>,
    private readonly i18n: I18nService,
  ) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    if (ctx.chat.type !== 'private') {
      return;
    }
    const username = `${ctx.from.first_name || ''} ${ctx.from.last_name || ''}`;
    const lang = ctx.from.language_code || 'en';

    await ctx.reply(
      this.i18n.t('commands-reply.start', {
        lang,
        args: {
          username,
        },
      }),
    );
    return;
  }

  @On('video_chat_started')
  async videoChatStarted(@Ctx() ctx: Context) {
    await ctx.deleteMessage(ctx.message.message_id);
  }

  @On('video_chat_ended')
  async videoChatEnded(@Ctx() ctx: Context) {
    await ctx.deleteMessage(ctx.message.message_id);
  }

  @On('pinned_message')
  async pinnedMessage(@Ctx() ctx: Context) {
    await ctx.deleteMessage(ctx.message.message_id);
  }

  @On('group_chat_created')
  async createdChat(@Ctx() ctx: Context) {
    await ctx.deleteMessage(ctx.message.message_id);
  }

  @On('left_chat_member')
  async leftChatMember(@Ctx() ctx: Context) {
    await ctx.deleteMessage(ctx.message.message_id);
  }

  @On('delete_chat_photo')
  async deleteChatPhoto(@Ctx() ctx: Context) {
    await ctx.deleteMessage(ctx.message.message_id);
  }

  @On('forum_topic_closed')
  async forumTopicClosed(@Ctx() ctx: Context) {
    await ctx.deleteMessage(ctx.message.message_id);
  }

  @On('forum_topic_created')
  async forumTopicCreated(@Ctx() ctx: Context) {
    await ctx.deleteMessage(ctx.message.message_id);
  }

  @On('message_auto_delete_timer_changed')
  async timerAutoDelete(@Ctx() ctx: Context) {
    await ctx.deleteMessage(ctx.message.message_id);
  }

  @On('new_chat_photo')
  async timerAutoPhoto(@Ctx() ctx: Context) {
    await ctx.deleteMessage(ctx.message.message_id);
  }

  @On('new_chat_title')
  async timerAutoTitle(@Ctx() ctx: Context) {
    await ctx.deleteMessage(ctx.message.message_id);
  }

  @On('new_chat_members')
  async timerAutoMember(@Ctx() ctx: Context) {
    await ctx.deleteMessage(ctx.message.message_id);
  }
}

export default BotUpdate;
