<?php

/*
 * This file is part of fsuarezm/ux-select2
 *
 * (c) Francisco Suárez Mulero
 * @author: Francisco Suárez Mulero
 * @email: fsuarezm@gmail.com
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

declare(strict_types=1);

namespace FSM\Symfony\UX\Select2\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;

class Select2Type extends AbstractType
{
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver
            ->setDefault('autocomplete-url', '')
            ->setAllowedTypes('autocomplete-url', 'string');

        $resolver
            ->setDefault('language', '')
            ->setAllowedTypes('language', 'string');

        $resolver
            ->setDefault('placeholder', '')
            ->setAllowedTypes('placeholder', 'string');
    }

    public function buildView(FormView $view, FormInterface $form, array $options): void
    {
        $view->vars['autocomplete-url'] = $options['autocomplete-url'];
        $view->vars['language'] = $options['language'];
        $view->vars['placeholder'] = $options['placeholder'];
    }

    public function getParent(): ?string
    {
        return TextType::class;
    }

    public function getBlockPrefix(): string
    {
        return 'select2';
    }
}