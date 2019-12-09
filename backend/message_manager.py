# -*- coding: UTF-8 -*-

from linebot.models import (
    MessageEvent, TextMessage, TextSendMessage,
    SourceUser, SourceGroup, SourceRoom,
    TemplateSendMessage, ConfirmTemplate, MessageAction,
    ButtonsTemplate, ImageCarouselTemplate, ImageCarouselColumn, URIAction,
    PostbackAction, DatetimePickerAction,
    CameraAction, CameraRollAction, LocationAction, MessageImagemapAction,
    CarouselTemplate, CarouselColumn, PostbackEvent,
    StickerMessage, StickerSendMessage, LocationMessage, LocationSendMessage,
    ImageMessage, VideoMessage, AudioMessage, FileMessage, ImageSendMessage, ImagemapSendMessage, BaseSize,
    ImagemapArea,
    UnfollowEvent, FollowEvent, JoinEvent, LeaveEvent, BeaconEvent,
    FlexSendMessage, BubbleContainer, ImageComponent, BoxComponent,
    TextComponent, SpacerComponent, IconComponent, ButtonComponent,
    SeparatorComponent, CarouselContainer, QuickReply, QuickReplyButton, VideoSendMessage,
    URITemplateAction
)

# import json, redis
# from lang import lang
#
# db = redis.Redis(db=13)


class MessageManager:

    def __init__(self, line_bot_api):

        self.line_bot_api = line_bot_api

    def link_rich_menu(self, user_id):
        self.line_bot_api.link_rich_menu_to_user(user_id, DEFAULT_RICHMENU_ID)

    def get_rich_menu(self, user_id):
        print(self.line_bot_api.get_rich_menu_id_of_user(user_id))
        for rich_menu in self.line_bot_api.get_rich_menu_list():
            if rich_menu.rich_menu_id != DEFAULT_RICHMENU_ID:
                self.line_bot_api.delete_rich_menu(rich_menu.rich_menu_id)
            print(rich_menu.rich_menu_id)

    def send_greeting_message(self, reply_token):

        # newcoming_text = "我們是你管很多道館到海邊的營養管家，你可以使用"
        #
        # buttons_template = ButtonsTemplate(
        #     title="您好，我是馨田的智能小幫手！", text=newcoming_text, actions=[
        #
        #         URIAction(label='我要預約', uri='line://app/1613607650-0mBQXARw'),
        #         PostbackAction(label='查詢預約', text='查詢預約', data='introduce_course'),
        #         URIAction(label='聯絡客服', uri="https://line.me/R/ti/p/%40zpp7402i"),
        #         PostbackAction(label='常見問題', text='常見問題', data='common_questions'),
        #     ])
        #
        # template_message = TemplateSendMessage(
        #     alt_text=newcoming_text, template=buttons_template)
        #
        # image_message = ImageSendMessage("https://hsintian.tk/static/welcome_image.jpg",
        #                                  "https://hsintian.tk/static/welcome_image.jpg")
        pass

        # self.line_bot_api.reply_message(reply_token, [template_message, image_message])

    def send_remind_message(self, user_id):

        remind_message = TextMessage(text="您好，已到了您設定進行追蹤的日期，再次使用MoleMe進行檢測。")

        self.line_bot_api.push_message(user_id, messages=remind_message)

    def send_donation_message(self, reply_token, user_id):

        # buttons_template = ButtonsTemplate(
        #     title="謝謝您的支持", text="請問您是否願意提供實質的回饋以支持我們持續提供免費的服務與高品質的結果？", actions=[

        #         URIAction(label='捐助新台幣 15 元', uri='line://app/1558636606-9G2opnRz?user_id={user_id}&item_name={item_name}&price={price}'.format(user_id=user_id, item_name="捐贈15元", price=15)),
        #         URIAction(label='捐助新台幣 30 元', uri='line://app/1558636606-9G2opnRz?user_id={user_id}&item_name={item_name}&price={price}'.format(user_id=user_id, item_name="捐贈30元", price=30)),
        #         URIAction(label='捐助新台幣 50 元', uri='line://app/1558636606-9G2opnRz?user_id={user_id}&item_name={item_name}&price={price}'.format(user_id=user_id, item_name="捐贈50元", price=50)),
        #     ])
        user_lang = db.hget(user_id, 'user_lang').decode()
        text = '請問您是否願意提供實質的回饋以支持我們持續提供免費的服務與高品質的結果？'
        if user_lang == 'en':
            text = 'Would you like to provide substantial feedback to support our continued free service and high-quality results?'

        buttons_template = ButtonsTemplate(
            text=text, actions=[
                URIAction(label=lang['donation']['options'][user_lang][0],
                          uri='line://app/1558636606-9G2opnRz?user_id={user_id}&item_name={item_name}&price={price}'.format(
                              user_id=user_id, item_name="捐贈15元", price=15)),
                URIAction(label=lang['donation']['options'][user_lang][1],
                          uri='line://app/1558636606-9G2opnRz?user_id={user_id}&item_name={item_name}&price={price}'.format(
                              user_id=user_id, item_name="捐贈30元", price=30)),
                URIAction(label=lang['donation']['options'][user_lang][2],
                          uri='line://app/1558636606-9G2opnRz?user_id={user_id}&item_name={item_name}&price={price}'.format(
                              user_id=user_id, item_name="捐贈50元", price=50)),
            ])

        template_message = TemplateSendMessage(
            alt_text="願意支持我們嗎？", template=buttons_template)

        self.line_bot_api.reply_message(reply_token, template_message)

    def send_thanks_message(self, user_id):

        message = TextSendMessage(text="您的支持會是我們開發的動力，感謝")

        self.line_bot_api.push_message(user_id, message)

    def pprint(self, text, reply_token=None):

        text_message = TextMessage(text=text)

        if reply_token:
            self.line_bot_api.reply_message(reply_token, messages=text_message)

        else:
            self.line_bot_api.push_message("U4e3a52745275f72629975c693c447c8d", messages=text_message)
