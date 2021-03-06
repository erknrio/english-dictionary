from django.contrib import admin
from .models import Word, Category, Level


class CategoryInline(admin.TabularInline):
    model = Word.category.through


@admin.register(Word)
class WordAdmin(admin.ModelAdmin):
    list_display = ["english_word", "spanish_word", "spanish_pronunciation", "phonetics", "notes", "level"]
    inlines = (CategoryInline,)
    exclude = ('category',)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name"]


@admin.register(Level)
class LevelAdmin(admin.ModelAdmin):
    list_display = ["name"]