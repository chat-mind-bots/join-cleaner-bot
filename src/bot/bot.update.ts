import { Ctx, InjectBot, On, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Update()
class BotUpdate {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}
  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.reply('Welcome');
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
