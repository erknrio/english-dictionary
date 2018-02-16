from django.contrib import admin
from .models import Word, Category


@admin.register(Word)
class WordAdmin(admin.ModelAdmin):
    list_display = ["english_word", "spanish_word", "spanish_pronunciation", "phonetics", "notes", "category"]


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name"]