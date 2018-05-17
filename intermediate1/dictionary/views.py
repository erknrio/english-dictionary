# Django
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.urls import reverse, reverse_lazy
# Plugins
from rest_framework import viewsets, permissions, mixins
# Custom
from .models import Word
from .forms import WordForm
from .serializers import *


# ViewSets
class WordViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Word.objects.all()
    serializer_class = WordSerializer


class CategoryViewSet(mixins.CreateModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.ListModelMixin,
                    viewsets.GenericViewSet):
    # Si agregasemos mixins.DestroyModelMixin
    # podriamos eliminar tambien.
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# Word
class WordList(ListView):
    model = Word
    template_name = 'dictionary/words_list.html'
    # paginate_by = 10


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