<?php

/*
 * This file is part of fsuarezm/ux-select2.
 *
 * (c) Francisco Suárez Mulero
 * @author: Francisco Suárez Mulero
 * @email: fsuarezm@gmail.com
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FSM\Symfony\UX\Select2\Form;

use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;

class EntitySelect2Type extends AbstractType
{
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver
            ->setDefault('autocomplete_url', '')
            ->setAllowedTypes('autocomplete_url', 'string');

        $resolver
            ->setDefault('select2_options', [])
            ->setAllowedTypes('select2_options', 'array');
    }

    public function buildView(FormView $view, FormInterface $form, array $options): void
    {
        $view->vars['autocomplete_url'] = $options['autocomplete_url'];
        $view->vars['select2_options'] = \json_encode($options['select2_options']);
    }

    public function getParent(): ?string
    {
        return EntityType::class;
    }

    public function getBlockPrefix(): string
    {
        return 'entity_select2';
    }
}
