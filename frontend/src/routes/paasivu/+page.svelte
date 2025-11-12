<script>
  import './+page.css';
<<<<<<< HEAD
  import { tick } from 'svelte';
  import { slide } from 'svelte/transition';
  let title = '';
  let firstName = '';
  let lastName = '';
  let email = '';
  let phone = '';
  let postalCode = '';
  let city = '';
  let birthdate = '';
  let driverslicense = '';
  let website = '';
  let linkedin = '';
  let photoPreview = null; // esikatselu
  let photoFile = null; // varsinainen tiedosto
  let cvUrl = '';
  let isLoading = false;
  let showExtra = false;
  let template = 'default'; // aktiivinen template
  let showSummary = false; // 👈 uusi toggle ammattiyhteenvedolle
  let summary = ''; // 👈 syötekenttää varten
  let experiences = [
    { title: '', company: '', city: '', start: '', end: '', description: '' },
  ];
  let educations = [
    {
      degree: '',
      city: '',
      school: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ];
  let languages = [];
  let photoLoaded = false;
=======
  import Header from '$lib/components/Header.svelte';
  import PersonalInfo from '$lib/components/PersonalInfo.svelte';
  import ExtraInfo from '$lib/components/ExtraInfo.svelte';
  import SummarySection from '$lib/components/SummarySection.svelte';
  import ExperienceSection from '$lib/components/ExperienceSection.svelte';
  import EducationSection from '$lib/components/EducationSection.svelte';
  import LanguageSection from '$lib/components/LanguageSection.svelte';
  import SkillsSection from '$lib/components/SkillsSection.svelte';
  import ExtraSection from '$lib/components/ExtraSection.svelte';
>>>>>>> b4448a92a006a7ca7afc49a199e3eb510f5fc46b

  import { cvData } from '$lib/stores/cvStore';
  import { throttle, updatePreview } from '$lib/utils/cvHelpers';

  let previewFrame;
  const throttledPreview = throttle(() => updatePreview(previewFrame), 350);
  $: $cvData, previewFrame && throttledPreview();
</script>

<Header />

<div class="page">
  <div class="left">
    <main>
      <form class="cv-form" on:submit|preventDefault>
        <div class="top-row"></div>
        <PersonalInfo />
        <ExtraInfo />
        <SummarySection />
        <hr class="section-divider" />
        <ExperienceSection />
        <hr class="section-divider" />
        <EducationSection />
        <hr class="section-divider" />
        <LanguageSection />
        <hr class="section-divider" />
        <SkillsSection />
        <hr class="section-divider" />
        <ExtraSection />
      </form>
    </main>
  </div>

  <div class="right">
    <iframe bind:this={previewFrame} class="preview-frame" title="CV Preview"
    ></iframe>
  </div>
</div>
