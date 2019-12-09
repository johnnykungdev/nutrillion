from flask import Flask

from linebot import (
    LineBotApi, WebhookHandler
)
from linebot.exceptions import (
    InvalidSignatureError
)

from linebot.models import (
    MessageEvent, TextMessage, TextSendMessage,
    SourceUser, SourceGroup, SourceRoom,
    TemplateSendMessage, ConfirmTemplate, MessageAction,
    ButtonsTemplate, ImageCarouselTemplate, ImageCarouselColumn, URIAction,
    PostbackAction, DatetimePickerAction,
    CameraAction, CameraRollAction, LocationAction,
    CarouselTemplate, CarouselColumn, PostbackEvent,
    StickerMessage, StickerSendMessage, LocationMessage, LocationSendMessage,
    ImageMessage, VideoMessage, AudioMessage, FileMessage,
    UnfollowEvent, FollowEvent, JoinEvent, LeaveEvent, BeaconEvent,
    FlexSendMessage, BubbleContainer, ImageComponent, BoxComponent,
    TextComponent, SpacerComponent, IconComponent, ButtonComponent,
    SeparatorComponent, QuickReply, QuickReplyButton,
    RichMenu, RichMenuSize, RichMenuArea, RichMenuBounds
)

from flask import Flask, request, abort, render_template, g, jsonify, send_from_directory, Markup, session, url_for, redirect, render_template_string, redirect

import json
import os

from utilities import make_static_tmp_dir
from message_manager import MessageManager

channel_secret = os.getenv('LINE_CHANNEL_SECRET')
channel_access_token = os.getenv('LINE_CHANNEL_ACCESS_TOKEN')

line_bot_api = LineBotApi(channel_access_token)
handler = WebhookHandler(channel_secret)
app = Flask(__name__)

message_manager = MessageManager(line_bot_api)

@handler.add(MessageEvent, message=TextMessage)
def handle_text_message(event):
    text = event.message.text.lower()

    message_manager.pprint(reply_token=event.reply_token, text=text)



@handler.add(MessageEvent, message=LocationMessage)
def handle_location_message(event):
    pass


@handler.add(MessageEvent, message=StickerMessage)
def handle_sticker_message(event):
    pass


@handler.add(MessageEvent, message=(ImageMessage))
def handle_content_message(event):
    if isinstance(event.message, ImageMessage):
        pass

@handler.add(PostbackEvent)
def handle_postback(event):
    profile = line_bot_api.get_profile(event.source.user_id)


@handler.add(FollowEvent)
def handle_follow(event):
    app.logger.info(f"{event.source.user_id} is following...")
    profile = line_bot_api.get_profile(event.source.user_id)


@handler.add(UnfollowEvent)
def handle_unfollow():
    app.logger.info(f"{event.source.user_id} is unfollowing...")


@handler.add(JoinEvent)
def handle_join(event):
    app.logger.info(f"{event.source.user_id} is joining...")


@handler.add(LeaveEvent)
def handle_leave():
    app.logger.info(f"{event.source.user_id} is leaving...")


@handler.add(BeaconEvent)
def handle_beacon(event):
    line_bot_api.reply_message(
        event.reply_token,
        TextSendMessage(
            text='Got beacon event. hwid={}, device_message(hex string)={}'.format(
                event.beacon.hwid, event.beacon.dm)))


@app.route("/callback", methods=['POST'])
def callback():
    # get X-Line-Signature header value
    signature = request.headers['X-Line-Signature']

    # get request body as text
    body = request.get_data(as_text=True)
    app.logger.info("Request body: " + body)

    # handle webhook body
    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        abort(400)

    return 'OK', 200

@app.route('/')
def homepage():
    return "hello there"

if __name__ == "__main__":

    # create tmp dir for download content
    make_static_tmp_dir()

    app.run(host='0.0.0.0',port=9001,debug=True)

