from django.forms import ModelForm, Select, Textarea, TextInput
from .models import Word, Category
from django.conf import settings


class WordForm(ModelForm):
    class Meta:
        # NOTE: Tiene que estar tanto en Forms.py como en su correspondiendete Views.py
        model = Word
        fields = ("english_word", "spanish_word", "spanish_pronunciation", "phonetics", "notes", "category",)
        widgets = {
            'english_word': TextInput(attrs={
                'autofocus': '',
            }),
            'notes': Textarea(attrs={
                'class': 'materialize-textarea',
                'data-length': settings.DEFAULT_TEXTAREA_SIZE,
            }),
            'category': Select(),
        }


class CategoryForm(ModelForm):
    class Meta:
        # NOTE: Tiene que estar tanto en Forms.py como en su correspondiendete Views.py
        model = Category
        fields = ("name",)
