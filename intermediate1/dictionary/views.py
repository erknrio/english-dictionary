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
    paginate_by = 10

    # def get_queryset(self):
    #     _u = User.objects.get(pk=self.kwargs['pkuser'])
    #     _t = User.objects.get(username=self.request.user)
    #     _me = Profile.objects.get(user_fk=_t)
    #     _p = Profile.objects.get(user_fk=_u, r_therapist=_me.therapist_fk)
    #     _l_words = Word.objects.filter(profile_fk=_p)
    #     return _l_words
    #
    # def get_context_data(self, *, object_list=None, **kwargs):
    #     context = super().get_context_data(**kwargs)
    #     _u = User.objects.get(pk=self.kwargs['pkuser'])
    #     _p = Profile.objects.get(user_fk=_u)
    #     context['pkuser'] = _p
    #     return context


class WordDetail(DetailView):
    model = Word
    template_name = 'dictionary/word_detail.html'

    # def get_queryset(self):
    #     _u = User.objects.get(pk=self.kwargs['pkuser'])  # hay que vincularlo al paciente, no al request.user que es el terapeura
    #     _t = User.objects.get(username=self.request.user)
    #     _me = Profile.objects.get(user_fk=_t)
    #     _p = Profile.objects.get(user_fk=_u, r_therapist=_me.therapist_fk)
    #     _d = Word.objects.filter(pk=self.kwargs['pk'], profile_fk=_p)
    #     return _d


class WordCreate(CreateView):
    model = Word
    form_class = WordForm
    template_name = "dictionary/word_form.html"
    success_url = reverse_lazy('words_list')

    # def form_valid(self, form):
    #     _u = User.objects.get(pk=self.kwargs['pkuser'])  # hay que vincularlo al paciente, no al request.user que es el terapeura
    #     _t = User.objects.get(username=self.request.user)
    #     _me = Profile.objects.get(user_fk=_t)
    #     _p = Profile.objects.get(user_fk=_u, r_therapist=_me.therapist_fk)
    #     form.instance.profile_fk = _p
    #     return super(WordCreate, self).form_valid(form)

    def get_success_url(self):
        return reverse('words_update', kwargs={'pk': self.object.pk})


class WordUpdate(UpdateView):
    template_name = "dictionary/word_form.html"
    model = Word
    form_class = WordForm
    success_url = reverse_lazy('words_list')

    # def get_queryset(self):
    #     _u = User.objects.get(pk=self.kwargs['pkuser'])
    #  hay que vincularlo al paciente, no al request.user que es el terapeura
    #     _t = User.objects.get(username=self.request.user)
    #     _me = Profile.objects.get(user_fk=_t)
    #     _p = Profile.objects.get(user_fk=_u, r_therapist=_me.therapist_fk)
    #     _h = Word.objects.filter(pk=self.kwargs['pk'], profile_fk=_p)
    #     return _h

    def get_success_url(self):
        return reverse('words_update', kwargs={'pk': self.object.pk})


class WordDelete(DeleteView):
    model = Word
    template_name = "dictionary/word_confirm_delete.html"
    success_url = reverse_lazy('words_list')

    # def get_queryset(self):
    #     _u = User.objects.get(pk=self.kwargs['pkuser'])  # hay que vincularlo al paciente, no al request.user que es el terapeura
    #     _t = User.objects.get(username=self.request.user)
    #     _me = Profile.objects.get(user_fk=_t)
    #     _p = Profile.objects.get(user_fk=_u, r_therapist=_me.therapist_fk)
    #     _h = Word.objects.filter(pk=self.kwargs['pk'], profile_fk=_p)
    #     return _h
    #
    # def get_success_url(self):
    #     u = Profile.objects.get(pk=self.kwargs['pkuser'])
    #     return reverse('words_list', kwargs={'pkuser': u.user_fk.pk })
