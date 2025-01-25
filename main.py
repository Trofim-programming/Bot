import asyncio
from aiogram import Bot, Dispatcher, Router
from aiogram.types import Message, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from aiogram.filters import Command

TOKEN = "7813662126:AAFEtpeLFoBAGCnnKP692EUnaniEWdnQwyA"
bot = Bot(token=TOKEN)
dp = Dispatcher()
router = Router()

@router.message(Command("start"))
async def send_welcome(message: Message):
    # Кнопка для открытия Web App
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="Open Planner",
                    web_app=WebAppInfo(url="https://trofim-programming.github.io/Stark/products.html")
                )
            ]
        ]
    )

    await message.answer(
        "Welcome to the Conference Planner Bot!\nClick the button below to open the planner.",
        reply_markup=keyboard
    )

async def main():
    dp.include_router(router)
    print("Bot is running...")
    await bot.delete_webhook(drop_pending_updates=True)
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
