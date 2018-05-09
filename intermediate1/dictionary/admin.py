from django.contrib import admin
from .models import Word, Category


class CategoryInline(admin.TabularInline):
    model = Word.category.through


@admin.register(Word)
class WordAdmin(admin.ModelAdmin):
    list_display = ["english_word", "spanish_word", "spanish_pronunciation", "phonetics", "notes"]
    inlines = (CategoryInline,)
    exclude = ('category',)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name"]