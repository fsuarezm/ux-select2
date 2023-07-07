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

namespace FSM\Symfony\UX\Select2\DependencyInjection;

use FSM\Symfony\UX\Select2\Form\Select2Type;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Definition;
use Symfony\Component\DependencyInjection\Extension\Extension;
use Symfony\Component\DependencyInjection\Extension\PrependExtensionInterface;

class Select2Extension extends Extension implements PrependExtensionInterface
{
    public function load(array $configs, ContainerBuilder $container)
    {
        $container
            ->setDefinition('form.select2', new Definition(Select2Type::class))
            ->addTag('form.type')
            ->setPublic(false)
        ;
    }

    public function prepend(ContainerBuilder $container)
    {
        // Register the Select2 form theme if TwigBundle is available
        $bundles = $container->getParameter('kernel.bundles');

        if (!isset($bundles['TwigBundle'])) {
            return;
        }

        $container->prependExtensionConfig('twig', ['form_themes' => ['@Select2/form_theme.html.twig']]);
    }
}