# Views
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
# Models
from .models import Word
# Forms
from .forms import WordForm
# Extra
from django.urls import reverse, reverse_lazy


# Word
class WordList(ListView):
    model = Word
    template_name = 'dictionary/words_list.html'


class WordDetail(DetailView):
    model = Word
    template_name = 'dictionary/word_detail.html'


class WordCreate(CreateView):
    model = Word
    form_class = WordForm
    template_name = "dictionary/word_form.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['header_text'] = "New Word"
        return context

    def get_success_url(self):
        return reverse('words_update', kwargs={'pk': self.object.pk})


class WordUpdate(UpdateView):
    template_name = "dictionary/word_form.html"
    model = Word
    form_class = WordForm

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['header_text'] = "Update Word"
        return context

    def get_success_url(self):
        return reverse('words_update', kwargs={'pk': self.object.pk})


class WordDelete(DeleteView):
    model = Word
    template_name = "dictionary/word_confirm_delete.html"
    success_url = reverse_lazy('words_list')